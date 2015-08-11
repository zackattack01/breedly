# Messaging

## The message model
- `body`
- `author_id`
- `recipient_id`
- `parent_id` to indicate the conversation
- timestamps to keep them organized
- `viewed` boolean
    - unseen messages will be displayed as notifications to the recipient

## The message controller
- new
- create
- show
- index
- destroy

## Coversations
- will be provided as an index of any message authored or recieved by the `current_user`
- will be organized by `parent_id` to keep conversations together
- this logic will be defined as a helper method in the user model

## Message Views
- each view will have a show to be viewed in isolation
- index view will be the json provided by the conversation logic above
- this will be a modal view eventually

## Backbone
- Will need messages collection and model
- will need show and index views as a template to be used in the modal view later