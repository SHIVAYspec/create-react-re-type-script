module TypeScriptMod = {
  @module("./typescriptmod.tsx") @react.component external hello: unit => React.element = "Hello"
}

@react.component
let make = () => {
  <div>
    <p> {React.string("Hello from rescriptmod.res")} </p>
    <TypeScriptMod.hello />
  </div>
}
