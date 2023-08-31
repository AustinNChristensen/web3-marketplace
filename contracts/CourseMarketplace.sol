// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint id; // 32
        uint price; // 32
        bytes32 proof; // 32
        address owner; // 20
        State state; // 1
    }

    // mapping of course hash to course data
    mapping(bytes32 => Course) public allOwnedCourses;

    // mapping of courseID to course hash
    mapping(uint => bytes32) private ownedCourseHashes;

    uint private totalOwnedCourses;

    address payable private owner;

    error CourseAlreadyOwned(bytes32 courseHash);

    // Only owner has access to this function
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        setNewContractOwner(msg.sender);
    }

    function purchaseCourse(bytes16 courseID, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseID, msg.sender));

        if (userOwnsCourse(courseHash)) {
            revert CourseAlreadyOwned(courseHash);
        }

        uint id = totalOwnedCourses++;
        ownedCourseHashes[id] = courseHash;

        allOwnedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setNewContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint id) external view returns (bytes32) {
        return ownedCourseHashes[id];
    }

    function getCourseByHash(
        bytes32 courseHash
    ) external view returns (Course memory) {
        Course memory course = allOwnedCourses[courseHash];
        return course;
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setNewContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function userOwnsCourse(bytes32 courseHash) private view returns (bool) {
        return allOwnedCourses[courseHash].owner == msg.sender;
    }
}
