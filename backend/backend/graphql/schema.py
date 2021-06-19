from django.db.models.base import Model
import graphene
from graphene_django import DjangoObjectType, fields
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from todos.models import Todo

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    log_in_user = mutations.ObtainJSONWebToken.Field()

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class TodoQuery(graphene.ObjectType):
    all_todos = graphene.List(TodoType, user_id=graphene.ID(), order=graphene.String())

    def resolve_all_todos(root, info, user_id, order):
        return Todo.objects.all().filter(user=user_id).order_by(order)

class Query(UserQuery, MeQuery, TodoQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)