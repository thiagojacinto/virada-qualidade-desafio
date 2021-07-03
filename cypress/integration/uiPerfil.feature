#language: en
@UI @register
Feature: [UI] User Profile

  Background: register a new user
    Given register a new user
    And access "criar-perfil"

    @happy
    Scenario: Successfully create a new profile
      
      When fulfill correctly required form fields
      Then should be redirect to "dashboard" page

    @failure @contract
    Scenario: Attempt to creaet a profile without required fields

      When submit the form
      Then validation warning should be visible

    @failure @format-url-field
    Scenario: Attempt to creaet a profile with invalid URL field

      Given fulfill the form indicating an invalid URL
      When submit the form
      Then validation warning should be visible