Feature: Login

    @Regression

    Scenario Outline: Valid login
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage


        Examples:
            | username                      | password   |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |



@Regression @Now

    Scenario Outline: Valid logout 
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        When I click on logout option 
        Then user should be logged out of the application 


        Examples:
            | username                      | password   |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |
