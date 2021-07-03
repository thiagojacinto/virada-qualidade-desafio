#language: en
@API @register
Feature: [API] Register a new User

  @happy
  Scenario: Successfully register a new user
    
    Given a valid user story data
    When send a POST request to "api/users"
    Then status should be 201
    And a jwt is expected
  
  @failure @contract
  Scenario Outline: Missing input fields fails to register a new User
    
    Given user data without "<missing_input>"
    When send a POST request to "api/users"
    Then status should be 400
    And error message should include "<missing_input>"

    Examples:
      | missing_input |
      | name          |
      | email         |
      | password      |
    
  @failure @invalid-password
  Scenario: Smaller passwords fails to register a new User
    
    Given a valid user story data
    But with password smaller than requested
    When send a POST request to "api/users"
    Then status should be 400
    And error message should include "password"

  @failure @already-registered
  Scenario: Already registered email fails to register a new User
    
    Given an already registered User
    When send a POST request to "api/users"
    Then status should be 400
    And error message should be "Usuário já registrado"