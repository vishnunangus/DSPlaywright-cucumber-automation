Feature: Materials Module

    @Regression 

    Scenario Outline: Create a new material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion




        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Create a new material and delete the material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion



        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Create a new material, edit material and delete the material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on hamberger button for the created material
        Then Click on edit button
        And Enter the updated material name as "12345"
        Then Click on save button
        And Validate the edited message fired sucessfully
        Then Validate the updated name of material is present in the table
        Then Click on Delete button of the updated material
        And Validate the deleted message is fired sucessfully for updated material
        Then Validate the updated material is not present in the table after the deletion

        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

    @Regression

    Scenario Outline: Validate details of the material created
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the material name
        And Validate the material creation date
        Then Validate the material created by field is "Vishnu Nangunuri"
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate the search functionality of the material module
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Click on search bar and enter the created material
        Then Validate the search results are filtered based on search text
        Then Validate the material name
        And Validate the material creation date
        Then Validate the material created by field is "Vishnu Nangunuri"
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the deleted message is fired sucessfully
        Then Validate the material is not present in the table after the deletion


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |

    @Regression

    Scenario Outline: Validate the count after creating and deleting a material
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        And get the count before the material creation
        Then Click on plus icon
        And Click on Add new material button
        Then Enter the Material Name as "Test Material"
        Then Click on Submit button
        And Validate the sucess mesaage for material creation
        Then Validate the created material is in the table
        And Validate the material count is incremented by one
        And Click on hamberger button for the created material
        Then Click on Delete button
        And Validate the material count is decremented by one


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


    @Regression

    Scenario Outline: Validate functionality of Bulk upload materials with csv file
        Given I open the DS application
        When I login with "<username>" and "<password>"
        Then I Click on Login button
        And Click on Launch button
        Then Validate user logged in to the DS Homepage
        Then Click on Material certificates page
        Then Click on plus icon
        And click on button bulk upload material list
        Then upload a csv file which contains the list of materials
        And Click on savebutton from the csv upload modal
        Then Validate the success message is fired sucessfully
        And compare the details from csv file with the material data in the UI
        When I delete all the materials uploaded using csv bulk upload
        Then Validate materials are not present in the table


        Examples:
            | username                      | password    |
            | vishnu.nangunuri@kanerika.com | Viya121898@ |


