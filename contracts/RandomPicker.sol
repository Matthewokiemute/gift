// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomPicker is Ownable {
    // Variables
    uint256 public servicePercent; // Service percentage (not used now)
    uint256 public serviceBalance; // Total service balance (not used now)

    // Structs
    struct GiftParticipant {
        address participantAddress;
        bool hasParticipated;
        bool won;
        bool paid;
    }

    struct GiftResult {
        uint256 id;
        bool completed;
        bool paidout;
        uint256 timestamp;
        uint256 sharePerWinner;
        GiftParticipant[] winners;
    }

    struct GiftStruct {
        uint256 id;
        string giftName;
        string giftDesc;
        string giftBanner;
        uint256 giftWinners;
        uint256 giftAmount;
        uint256 totalParticipant;
        uint256 participants;
        uint256 winners;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
        GiftParticipant[] participantsList;
        GiftResult result;
    }

    mapping(uint256 => GiftStruct) private gifts;

    // Events
    event GiftCreated(uint256 id, string name, uint256 expiresAt);
    event ParticipantJoined(uint256 giftId, address participant);
    event WinnersSelected(uint256 giftId, GiftParticipant[] winners);
    event PrizePaid(uint256 giftId, address winner, uint256 amount);

    // Function to get the current time
    function currentTime() internal view returns (uint256) {
        return block.timestamp;
    }

    // Function to create a new gift
    function createGift(
        string memory giftName,
        string memory giftDesc,
        string memory giftBanner,
        uint256 giftWinners,
        uint256 giftAmount,
        uint256 expiresAt
    ) public payable {
        require(expiresAt > currentTime(), "Expiration time must be in the future");
        require(giftWinners > 0, "Number of winners must be greater than zero");

        uint256 totalFee = giftWinners * giftAmount;
        require(msg.value >= totalFee, "Insufficient funds provided to cover the prize distribution");

        uint256 newGiftId = uint256(keccak256(abi.encodePacked(currentTime(), msg.sender))); // Unique ID

        GiftStruct storage newGift = gifts[newGiftId];
        newGift.id = newGiftId;
        newGift.giftName = giftName;
        newGift.giftDesc = giftDesc;
        newGift.giftBanner = giftBanner;
        newGift.giftWinners = giftWinners;
        newGift.giftAmount = giftAmount;
        newGift.totalParticipant = 0;
        newGift.winners = 0;
        newGift.owner = msg.sender;
        newGift.createdAt = currentTime();
        newGift.expiresAt = expiresAt;

        // Deposit the total prize amount into the contract
        payable(address(this)).transfer(totalFee);

        emit GiftCreated(newGiftId, giftName, expiresAt);
    }

    // Function to join a gift pool
    function joinGift(uint256 giftId) external {
        GiftStruct storage gift = gifts[giftId];
        require(currentTime() < gift.expiresAt, "Gift has expired");
        require(!gift.participantsList[findParticipantIndex(gift, msg.sender)].hasParticipated, "Already participated");

        gift.participantsList.push(GiftParticipant({
            participantAddress: msg.sender,
            hasParticipated: true,
            won: false,
            paid: false
        }));
        gift.totalParticipant++;
        emit ParticipantJoined(giftId, msg.sender);
    }

    // Function to select winners and distribute prizes
    function selectWinners(uint256 giftId) external onlyOwner {
        GiftStruct storage gift = gifts[giftId];
        require(currentTime() >= gift.expiresAt, "Gift has not expired yet");
        require(gift.totalParticipant > 0, "No participants to select from");
        require(gift.giftWinners <= gift.totalParticipant, "Number of winners exceeds participants");

        uint256 numberOfWinners = gift.giftWinners;
        GiftParticipant[] memory winners = new GiftParticipant[](numberOfWinners);

        address[] memory participantAddresses = new address[](gift.totalParticipant);
        uint256 numParticipants = 0;

        for (uint256 i = 0; i < gift.participantsList.length; i++) {
            if (gift.participantsList[i].hasParticipated) {
                participantAddresses[numParticipants] = gift.participantsList[i].participantAddress;
                numParticipants++;
            }
        }

        for (uint256 i = 0; i < numberOfWinners; i++) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(currentTime(), block.difficulty, msg.sender))) % numParticipants;
            address winnerAddress = participantAddresses[randomIndex];

            winners[i] = gift.participantsList[findParticipantIndex(gift, winnerAddress)];
            winners[i].won = true;
        }

        gift.result = GiftResult({
            id: giftId,
            completed: true,
            paidout: false,
            timestamp: currentTime(),
            sharePerWinner: gift.giftAmount,
            winners: winners
        });

        distributePrizes(giftId, winners, gift.giftAmount);

        emit WinnersSelected(giftId, winners);
    }

    // Function to distribute prizes to winners
    function distributePrizes(uint256 giftId, GiftParticipant[] memory winners, uint256 amount) private {
        GiftStruct storage gift = gifts[giftId];
        uint256 totalAmount = amount * winners.length;

        require(address(this).balance >= totalAmount, "Insufficient contract balance to pay all winners");

        for (uint256 i = 0; i < winners.length; i++) {
            payable(winners[i].participantAddress).transfer(amount);
            for (uint256 j = 0; j < gift.participantsList.length; j++) {
                if (gift.participantsList[j].participantAddress == winners[i].participantAddress) {
                    gift.participantsList[j].paid = true;
                    break;
                }
            }
            emit PrizePaid(giftId, winners[i].participantAddress, amount);
        }
    }

    // Function to get the gift details
    function getGiftDetails(uint256 giftId) external view returns (
        uint256 id,
        string memory giftName,
        string memory giftDesc,
        string memory giftBanner,
        uint256 giftWinners,
        uint256 giftAmount,
        uint256 totalParticipant,
        uint256 participants,
        uint256 winners,
        address owner,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        GiftStruct storage gift = gifts[giftId];
        return (
            gift.id,
            gift.giftName,
            gift.giftDesc,
            gift.giftBanner,
            gift.giftWinners,
            gift.giftAmount,
            gift.totalParticipant,
            gift.participants,
            gift.winners,
            gift.owner,
            gift.createdAt,
            gift.expiresAt
        );
    }

    // Function to get participant addresses
    function getParticipantAddresses(uint256 giftId) external view returns (GiftParticipant[] memory) {
        return gifts[giftId].participantsList;
    }

    // Helper function to find the index of a participant
    function findParticipantIndex(GiftStruct storage gift, address participant) internal view returns (uint256) {
        for (uint256 i = 0; i < gift.participantsList.length; i++) {
            if (gift.participantsList[i].participantAddress == participant) {
                return i;
            }
        }
        revert("Participant not found");
    }
}
