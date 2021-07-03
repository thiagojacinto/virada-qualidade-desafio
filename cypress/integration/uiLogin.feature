#language: en
@UI @login
Feature: [UI] Log an User

  @happy
  Scenario: Successfully log an user

    Given access "login"
    When fulfill credentials correctly
    And submit the form
    Then should be redirect to "dashboard" page
  
  @happy
  Scenario: Login page to have a Register link

    Given access "login"
    Then should be visible a Register link
  
  @failure
  Scenario Outline: Attempt to log in with invalid fields

    Given access "login"
    When fulfill with invalid <field> 
    And submit the form
    Then validation warning should be visible

    Examples:
      | field    |
      | email    |
      | password |
  
  Scenario: Attempt to log in with unregistered email

    Given access "login"
    When fulfill with unregistered email
    And submit the form
    Then an alert should appear with "Credenciais inválidas"
  
  Scenario: Attempt to log in with wrong password

    Given access "login"
    When fulfill with wrong password
    And submit the form
    Then an alert should appear with "Credenciais inválidas"