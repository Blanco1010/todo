import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.inputs';
import { UpdateTodoInput } from './dto/inputs/update-todo.inputs copy';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Priedra del Alma', done: false },
        { id: 2, description: 'Priedra del Espacio', done: true },
        { id: 1, description: 'Priedra del Poder', done: false },
    ]

    get totalTodos(){
        return this.todos.length;
    }

    get totalPendingTodos(){
        return this.todos.filter( e => e.done === false).length;
    }
    
    get totalCompletedTodos(){
        return this.todos.filter( e => e.done === true).length;
    }

    findAll( statusArgs: StatusArgs ): Todo[] {

        const { status } = statusArgs;

        if( status !== undefined) return this.todos.filter( todo => todo.done === status );

        return this.todos;
    }

    findOne( id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        
        if(!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {

        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map( todo => todo.id ), 0 ) + 1;

        this.todos.push(todo);

        return todo;
    }

    update(id: number, updateTodoInput:UpdateTodoInput ){

        const {  description, done } = updateTodoInput;
        const todoToUpdate = this.findOne(id);

        if( description ) todoToUpdate.description = description;
        if( done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map( todo => {
            return (todo.id === id) ? todoToUpdate : todo
        });

        return todoToUpdate;
    }

    delete( id: number ){
        this.findOne(id);
        this.todos = this.todos.filter( todo => todo.id !== id );
        return true;
    }
}
