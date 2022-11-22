# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
I'm going to assume we already have an agent list page that contains all the agent's data, so I'm going to add there a button for adding/updating the `customId` per each agent row.

If the agent has already a `customId` value, I'm going to show it with the update button; Otherwise, I'm going to show just the add custom id button.

Both buttons are going to open a modal that contains the  `customId` field and the save button.

I'm also assuming the agent's data is returned by the agent's endpoint, so we need to create a new table called `CustomIds` and a new endpoint called `agent/:id/customId` to add/update the agents's custom id.

Lastly, I need to update the `getShiftsByFacility` function for adding the `customId` value into the agent metadata and also update the report for including the `customId` value.

Based on the previous flow, my stories are:

## User Story #1

### Allow to save the agent customId in the database

**Effort Estimation**: 5 points

#### Acceptance criteria:

* Expose a new endpoint to save the agent customId per Agent
* The endpoint definition is `POST agent/:id/customId`
* Agent customs ids will be stored on CustomIds table
* The endpoint only allows to add or update agents belong User facility
* `customId` is mandatory

#### Technical notes:

* Create a new table in the database whose name should be `CustomIds` and must have the following structure:

| Column name | Primary Key | Foreign Key | Data Type | Maximum length | Is Nullable |
|-------------|-------------|-------------|-----------|----------------|-------------|
| agent_id    |      X      | Agent(ID)   | varchar   | 50             | false       |
| facility_id |      X      | Facility(ID)| varchar   | 50             | false       |
| custom_id   |             |             | varchar   | 50             | false       |

---
**NOTE**

- The primary key contains the `agent_id` and the `facility_id`
- `agent_id` is a foreign key of the `Agent` table and `id` column
- `facility_id` is a foreign key of the `Facility` table and `id` column
---

* Create the `POST agent/:id/customId` endpoint to save the `customId` in the database:

Request Body:
```
{
    customId: 'Fabian'
}
```
Response is void:
```
```
Response status codes:

| Code  | Message               |
|-------|-----------------------|
| 200   | OK                    |
| 401   | Unauthorized          |
| 403   | Forbidden             |
| 404   | Not found             |
| 500   | Internal Server Error |
| 503   | Service Unavailable   |


## User Story #2

### Return agent custom id in the Get Agents endpoint 

**Effort Estimation**: 3 points

#### Depends on: [User Story #1](#user-story-#1)

#### Acceptance criteria:

* Modify `GET agent/:id` endpoint to return the agent custom id
* Each agent will have a `customId` property
  * if `customId` doesn't exist, the property will be empty
  * if `customId` exists, the property will be the customId value

#### Technical notes:

* `customId` is stored on `CustomIds` table [User Story #1](#user-story-#1)
* Update the `GET agent` endpoint to return the `customId`:

Request:
```
```
Response example:
```
[{
    id: '123456',
    firstName: 'Fabian',
    lastName: 'Moreno'
    ...
    customId: ''
}]
```

```
[{
    id: '123456',
    firstName: 'Fabian',
    lastName: 'Moreno'
    ...
    customId: 'fabian123456'
}]
```
Response status codes:

| Code  | Message               |
|-------|-----------------------|
| 200   | OK                    |
| 401   | Unauthorized           |
| 403   | Forbidden             |
| 404   | Not found             |
| 500   | Internal Server Error |
| 503   | Service Unavailable   |

## User Story #3

### Include agent custom id in hours per Agent worked report 

**Effort Estimation**: 2 points

#### Depends on: [User Story #1](#user-story-#1)

#### Acceptance criteria:

* Include `customId` into the generated PDF report file which is generated by the user in the app.
* In the PDF report, If the agent does have a `customId` value, it should show it instead of the internal id
* In the PDF report, If the agent doesn't have a `customId` value, it should show the internal id
* The PDF file must be returned for any case.
 

#### Technical notes:

* Update the `getShiftsByFacility` function in order to include `customId` into the agent's metadata
* Update `generateReport` function to render the custom id instead of the internal id as per AC's description



## User Story #4

### Allow to add/update agent custom id in the agent list page

**Effort Estimation**: 8 points

#### Depends on:
[User Story #1](#user-story-#1)
[User Story #2](#user-story-#2)

#### Acceptance criteria:

* When the user navigates to the agent list page for each Agent Row/Card:
  * Add **Add Custom Id** button if the agent doesn't have a custom id
  * When user clicking **Add Custom Id** button the **Add Custom Id** modal will be open
  * the **Add Custom Id** modal 
    * will have the **Custom Id** field with the placeholder `Please enter the agent custom id`
    * **Custom Id** field has a max length of 50
    * will have the **Save** button
    * **Save** button is disabled if `customId` field is empty
    * **Save** button is enable if `customId` field is not empty
    * When the user clicks the **save** button it will make request the following endpoint `POST agent/:id/customId` [User Story #1](#user-story-#1)
    * While server is processing the request it is going to display a loading spinner in the **save** button
    * While server is processing the request it is going disable the **save** button
    * Once server finishes processing the request:
      * it should hide the loading spinner
      * if request fails it will show a `Oops something has gone wrong` message close to the **save** button and enable the **save** button
      * * When user clicks on the **save** button it will hide the error message
      * if request is success it will close the modal and show the custom id in the agent card/row
    
  
  * Display the agent customId if the agent does have a custom id
  * Add **Modify** button if the agent does have a custom id
  * When user clicking **Modify** button the **Modify Custom Id** modal will be open
  * the **Modify Custom Id** modal
    * will have the **Custom Id** field with the placeholder `Please enter the agent custom id`
    * **Custom Id** field has a max length of 50
    * **Custom Id** will be populated with the agent custom id
    * will have the **Save** button
    * **Save** button is disabled if `customId` field is empty
    * **Save** button is enable if `customId` field is not empty
    * When the user clicks the **save** button it will make request the following endpoint `POST agent/:id/customId` [User Story #1](#user-story-#1)
    * While server is processing the request it is going to display a loading spinner in the **save** button
    * While server is processing the request it is going disable the **save** button
    * * Once server finishes processing the request:
    * it should hide the loading spinner
    * if request fails it will show a `Oops something has gone wrong` message close to the **save** button and enable the **save** button
    * When user clicks on the **save** button it will hide the error message
    * if request is success it will close the modal and show the custom id in the agent card/row


#### Technical notes:

* Use `GET agent` endpoint to get the agent list in should include the custom id [User Story #2](#user-story-#2).
* `POST agent/:id/customId` endpoint is define on [User Story #1](#user-story-#1)
* Don't create 2 modals, The `CustomId` modal is a reusable component that receives as parameter title and custom id
* When the user clicks outside the `CustomId` modal it should be closed
* For the modal component use [MUI Modals](https://mui.com/material-ui/react-modal/)
