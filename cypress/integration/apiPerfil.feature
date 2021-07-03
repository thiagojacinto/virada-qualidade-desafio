#language: en
@API @profile
Feature: [API] User Profile

  @happy @create-profile
  Scenario: Successfully create a profile for a registered user
    
    Given a new user had been created
    And had obtained a valid jwt
    And a valid profile was made
    When send a POST request to "api/profile" with that jwt
    Then status should be 201
    And a valid profile is expected

  @happy @update-profile
  Scenario: Successfully update a profile for a registered user
    
    Given an already profiled user had logged in
    And had obtained a valid jwt
    And a valid profile was made
    When send a POST request to "api/profile" with that jwt
    Then status should be 200
    And a valid profile is expected

  @failure @contract
  Scenario Outline: Missing input fields fails to create a profile for a registered user
    
    Given a new user had been created
    And had obtained a valid jwt
    And a valid profile was made
    But removed "<missing_input>" from profile
    When send a POST request to "api/profile" with that jwt
    Then status should be 400
    And error message should include "<missing_input>"

    Examples:
      | missing_input |
      | status        |
      | skills        |

  @failure @invalid-jwt
  Scenario Outline: Attempt to create an profile with invalid authentication
    
    Given had "<invalid_token>" jwt
    And a valid profile was made
    When send a POST request to "api/profile" with that jwt
    Then status should be 401
    And error message should be "Token não existente, autorização negada"

    Examples:
      | invalid_token |
      | invalid       |
      | empty         |