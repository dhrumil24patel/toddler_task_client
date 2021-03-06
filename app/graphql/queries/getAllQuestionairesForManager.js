import gql from 'graphql-tag';

export default gql(`
query($assignedBy:String!) {
    questionaires(assignedBy:$assignedBy){
        _id
        username
        questionaireTemplateType
        assignedAt
        assignedBy
        responded
        questions{
            title
            inputType
            response
            descriptionText
    }
  }
}`);
