import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import { getBabyNames } from './babyNamesData';

/**
 * enum Gender { M, F }
 *
 * type BabyName {
 *   name: String,
 *   gender: Gender,
 *   count: Int
 *   year: Int
 * }
 *
 * type Query {
 *   counts(name: String!, gender: Gender!): [Name]
 * }
 */

const genderEnum = new GraphQLEnumType({
  name: 'Gender',
  description: 'A gender, Male or Female.',
  values: {
    M: {
      value: 'M',
      description: 'Male'
    },
    F: {
      value: 'F',
      description: 'Female'
    }
  }
});

const babyNameType = new GraphQLObjectType({
  name: 'BabyName',
  description: 'A combination of name, year, count, and gender.',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The BabyName\'s name.'
    },
    gender: {
      type: new GraphQLNonNull(genderEnum),
      description: 'The gender associated with this name and count.'
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of name/gender born this year.'
    },
    year: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The year for this BabyName.'
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    counts: {
      type: new GraphQLList(babyNameType),
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The name of the baby names to fetch.'
        },
        gender: {
          type: new GraphQLNonNull(genderEnum),
          description: 'The gender of the baby names to fetch.'
        }
      },
      resolve: (root, { name, gender }) => getBabyNames(name, gender)
    }
  })
});

export const BabyNamesSchema = new GraphQLSchema({
  query: queryType,
  types: [babyNameType]
});
