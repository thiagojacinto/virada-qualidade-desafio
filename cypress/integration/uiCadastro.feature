#language: en
@UI @register
Feature: [UI] Register a new User

  @happy
  Scenario: Successfully register a new user
    
    Given access "cadastrar"
    When fulfill correctly the form fields
    And submit the form
    Then should be redirect to "dashboard" page

  @happy
  Scenario: Register page to have a Login link

    Given access "cadastrar"
    Then should be visible a Login link

  @failure @contract
  Scenario Outline: All register form fields are required

    Given access "cadastrar"
    When fulfill without <missing_field>
    And submit the form
    Then validation warning should be visible

    Examples:
      | missing_field |
      | name          |
      | email         |
      | password      |
      | password2     |

  @failure @already-registered-user 
  Scenario: Attempts to register an already registered email

    Given access "cadastrar"
    When fulfill the form fields with registered email
    And submit the form
    Then an alert should appear with "Usuário já registrado"

  @failure @small-password @focus
  Scenario: Attempts to register with small password

    Given access "cadastrar"
    When fulfill the form fields with small password
    And submit the form
    Then validation warning should be visible