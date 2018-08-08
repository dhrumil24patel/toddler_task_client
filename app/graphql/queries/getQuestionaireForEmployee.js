import gql from 'graphql-tag';

export default gql(`
query($username:String!) {
    questionaires(username:$username){
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
