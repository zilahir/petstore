# Input

`<Input>` is a generic reusable components, that implements the html `<input>` `HTMLElement`.

## Props

| name          | type                                         | default   | isRequired | example                          |
| ------------- | -------------------------------------------- | --------- | ---------- | -------------------------------- | ----------------- |
| `label`       | `string`                                     | `null`    | `true`     | `label="some label"`             |
| `onChange`    | `React.ChangeEventHandler<HTMLInputElement>` | `null`    | `true`     | `onChange={event => event}`      |
| `className`   | `string`                                     | `''`      | `false`    | `className={styles.customInput}` |
| `palceHolder` | `string`                                     | `''`      | `false`    | `placeHolder="Hello!"`           |
| `type`        | `enum: text                                  | password` | `text`     | `false`                          | `type="password"` |
| `ref`         | `MutableRefObject<T>`                        | `null`    | `false`    | `ref{someRef}`                   |
| `value`       | `string`                                     | `''`      | `true`     | `value{someControllerValue}`     |
| `register`    | `UseFormRegister`                            | `null`    | `false`    | `register={register}`            |
| `required`    | `boolean`                                    | `false`   | `false`    | `required={true}`                |
| `error`       | `Record<key, value>`                         | `null`    | `false`    | `error={error}`                  |
| `id`          | `string`                                     | `''`      | `false`    | `id="userName"`                  |

## Usage

Let's consider the following basic example:

```javascript
<Input label="username" onChange={handleUserNameChange} value={userName} />
```

As the props above states it, it's possible to hook in the [`react-hook-form`](https://react-hook-form.com/) library, that makes it easy to validate forms.

Exampe usage of this `<Input>` component, when validation is needed within a `<form>`

```javascript
import { useForm } from 'react-hook-form'
const { register, handleSubmit } = useForm<any>()
const [password, setPassword] = useState<password>('')
<form>
  <Input
    label="Password"
    type="password"
    onChange={event => setPassword(event.target.value)}
    id="username"
    required
    register={register}
    value={paassword}
  >
</form>
```

See example implementation in: `packages/client/src/pages/Login/index.tsx`
