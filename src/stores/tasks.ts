import {makeAutoObservable, observable, action} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

interface TaskItem {
    id:number,
    title:string,
    desc:string,
    done:boolean
}

export class TaskStore implements IStore {
  tasks : TaskItem[] = [{
    id:0,
    title:"hello",
    desc:"this is description",
    done:false
  }];

  constructor() {
    makeAutoObservable(this,{
      tasks:observable,
      addTask: action,
      toggleTask: action
    }
    );

    makePersistable(this, {
      name: TaskStore.name,
      properties: ['tasks'],
    });
  }

  addTask(title:string, desc: string){
    const item : TaskItem = {
        id: +Math.random().toFixed(4),
        title,
        desc,
        done: false
    }
    this.tasks.push(item)
  }

  toggleTask(id: number){
    const index = this.tasks.findIndex(item => item.id === id);
    if (index>-1) {
      this.tasks[index].done = !this.tasks[index].done
    }
  }

  // Unified set methods
  set<T extends StoreKeysOf<TaskStore>>(what: T, value: TaskStore[T]) {
    (this as TaskStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<TaskStore>>(obj: Record<T, TaskStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as TaskStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
