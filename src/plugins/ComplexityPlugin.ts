import { GraphQLSchemaHost } from '@nestjs/graphql'
import { Plugin } from '@nestjs/apollo'
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server'
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity'
import { GraphQLError } from 'graphql'

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    // Maximum allowed query complexity
    const MAX_ALLOWED_COMPLEXITY = 20
    const { schema } = this.gqlSchemaHost

    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            // Default value per field
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        })
        if (complexity > MAX_ALLOWED_COMPLEXITY) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${MAX_ALLOWED_COMPLEXITY}`,
          )
        }
        console.log('Query Complexity:', complexity)
      },
    }
  }
}
