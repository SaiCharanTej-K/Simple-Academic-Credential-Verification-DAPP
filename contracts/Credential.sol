// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Credential {
    struct AcademicRecord {
        string studentName;
        string course;
        string institution;
        string issuedDate;
    }

    mapping(address => AcademicRecord[]) private credentials;

    function issueCredential(
        address student,
        string memory name,
        string memory course,
        string memory institution,
        string memory date
    ) public {
        credentials[student].push(AcademicRecord(name, course, institution, date));
    }

    function getCredentials(address student) public view returns (AcademicRecord[] memory) {
        return credentials[student];
    }
}
