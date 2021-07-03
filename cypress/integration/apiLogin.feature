#language: en
@API @login
Feature: [API] Log with an User

  @happy
  Scenario: Successfully log with a registered user
    
    Given a valid user credentials
    When send a POST request to "api/auth"
    Then status should be 200
    And a jwt is expected

  @failure @contract
  Scenario Outline: Missing input fields fails to log with a registered user
    
    Given user credentials without "<missing_input>"
    When send a POST request to "api/auth"
    Then status should be 400
    And error message should include "<missing_input>"

    Examples:
      | missing_input |
      | email         |
      | password      |
    
  @failure @invalid-credentials
  Scenario Outline: Attempts to log with invalid credentials
    
    Given a user with invalid <credential>
    When send a POST request to "api/auth"
    Then status should be 401
    And error message should be "Credenciais inválidas"

    Examples:
      | credential |
      | email      |
      | password   |