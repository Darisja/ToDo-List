import {Entity, Fields, Validators, Allow} from "remult";

@Entity("tasks", {
    allowApiCrud: Allow.authenticated,
    allowApiInsert: "admin",
    allowApiDelete: "admin"
})

export class Task {
    @Fields.autoIncrement()
    id = 0

    @Fields.string({
        validate: (task) => {
          if (task.title.length < 3) throw "Too Short"
        },
        allowApiUpdate: "admin"
      })
      title = ""
    
    @Fields.boolean()
    completed = false
}