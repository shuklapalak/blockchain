// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVMContract {
  // Struct to represent a candidate
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // number of votes cast
  uint public totalVotes;

  // start voting if votingStart is true
  bool public votingStart;

  // End voting if votingEnd is true
  bool public votingEnd;

  // Array of candidates
  Candidate[] public candidates;

  // Mapping to keep track of whether an address has voted
  mapping(address => bool) public hasVoted;

  // Event to log when a vote is cast
  event Vote(address indexed voter, uint indexed candidateId);

  // Modifier to check if the method has been called
  modifier hasVotingStarted() {
    require(!votingStart, "The addition of users has been halted.");
    _;
  }

  // Modifier to check if the method has been called
  modifier startVote() {
    require(votingStart, "Voting has not started yet");
    _;
  }

  // Modifier to check if the method has been called
  modifier endVote() {
    require(!votingEnd, "Voting is stopped");
    _;
  }

  // Function to add a candidate
  function addCandidate(string[] memory _candidateNames) public hasVotingStarted {
    for (uint i = 0; i < _candidateNames.length; i++) {
      candidates.push(Candidate(i, _candidateNames[i], 0));
    }
  }

  // Stop voting
  function stopVoting() public {
   votingEnd = true;
  }

  // Start voting
  function startVoting() public {
    votingStart = true;
  }

  // Function to cast a vote for a candidate
  function vote(uint _candidateId) public startVote endVote {
    // Check if the sender has already voted
    require(!hasVoted[msg.sender], "You have already voted");

    // Check candidate is valid or not
    require(_candidateId < candidates.length, "Invalid candidate ID");

    // Increment the vote count
    candidates[_candidateId].voteCount++;

    // Mark the sender's address as voted
    hasVoted[msg.sender] = true;


    totalVotes++;
    // Emit an event to log the vote
    emit Vote(msg.sender, _candidateId);
  }

  // // Function to get the total number votes
  // function getTotalVotes() public view returns (uint) {
  //   uint total = 0;
  //   for(uint i = 0; i < candidates.length; i++) {
  //    total += candidates[i].voteCount;
  //   }
  //   return total;
  // }

  // Function to get the total votes for a candidate
  function getTotalVotesofCandidate(uint _candidateId) public view returns (uint) {
    require(_candidateId < candidates.length, "Invalid candidate ID");
    return candidates[_candidateId].voteCount;
  }

  // Function to get the total number of candidates
  function getTotalCandidates() public view returns (uint) {
    return candidates.length;
  }
}
