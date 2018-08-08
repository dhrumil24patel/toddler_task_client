import gql from 'graphql-tag';

export default gql(`
query {
  questionaireTemplates{
    _id
    type
  }
}`);
