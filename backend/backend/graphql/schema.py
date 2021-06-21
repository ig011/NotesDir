from django.db.models.base import Model
import graphene
from graphene_django import DjangoObjectType, fields
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from todos.models import Todo
from users.models import ExtendUser
from datetime import datetime

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    log_in_user = mutations.ObtainJSONWebToken.Field()

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class addTodo(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        thumbnail = graphene.String()
        background_color = graphene.String()
        start_date = graphene.DateTime()
        end_date = graphene.DateTime(required=True)

    todo = graphene.Field(TodoType)
    todo_created = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, user_id, title, description, thumbnail, background_color, start_date, end_date):
        user = ExtendUser.objects.filter(id=user_id).first()
        if user:
            todo_created = True
            todo = Todo(user_id=user_id, title=title, description=description, thumbnail=thumbnail, background_color=background_color, start_date=start_date, end_date=end_date)
            todo.save()
            return addTodo(todo_created=todo_created, todo=todo)
        else:
            todo_created = False
            return addTodo(todo_created=todo_created)

class updateTodo(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        todo_id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        thumbnail = graphene.String()
        background_color = graphene.String()
        start_date = graphene.DateTime()
        end_date = graphene.DateTime()

    todo = graphene.Field(TodoType)
    todo_updated = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, user_id, todo_id, title, description, thumbnail, background_color, start_date, end_date):
        user = ExtendUser.objects.filter(id=user_id).first()
        if user:
            todo_updated = True
            todo = Todo.objects.get(id=todo_id)
            if todo:
                todo.title = title
                todo.description = description
                todo.thumbnail = thumbnail
                todo.background_color = background_color
                todo.start_date = start_date
                todo.end_date = end_date
                todo.save()
                return updateTodo(todo_updated=todo_updated, todo=todo)
            else:
                return updateTodo(todo_updated=todo_updated)
        else:
            todo_updated = False
            return updateTodo(todo_updated=todo_updated)        

class deleteTodo(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        todo_id = graphene.ID(required=True)

    todo_deleted = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, user_id, todo_id):
        user = ExtendUser.objects.get(id=user_id)
        if user:
            todo = Todo.objects.get(id=todo_id)
            if todo:
                todo_deleted = True
                todo.delete()
                return todo_deleted
            else:
                todo_deleted = False
                return todo_deleted

class TodoQuery(graphene.ObjectType):
    all_todos = graphene.List(TodoType, user_id=graphene.ID(), order=graphene.String())

    def resolve_all_todos(root, info, user_id, order):
        return Todo.objects.filter(user=user_id).order_by(order)

class Query(UserQuery, MeQuery, TodoQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, graphene.ObjectType):
    add_todo = addTodo.Field()
    update_todo = updateTodo.Field()
    delete_todo = deleteTodo.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)