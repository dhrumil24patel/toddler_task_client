import gql from 'graphql-tag';

export default gql(`
mutation($username: String!, $questionaireTemplate: String!, $assignedBy: String, $organization: String){
    assignQuestionaire(input:{
    username: $username
    questionaireTemplateType: $questionaireTemplate
    assignedBy: $assignedBy
    organization: $organization
  }){
    _id
    questionaireTemplateType
    responded
    assignedAt
    assignedBy
    responded
    questions{
      _id
      inputType
      title
      response
    }
  }
}
`);