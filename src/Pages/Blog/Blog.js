import React from 'react'

const Blog = () => {
  return (
    <div className="mx-5 my-5 ">
        <h1 className="text-center text-3xl py-5 font-bold">Blog</h1>
      <h1 className='text-xl font-semibold'>
       
        What are the different ways to manage a state in a React application?
      </h1>
      <p>
        In modern React, we build our applications with functional components.
        Components are themselves JavaScript functions, independent and reusable
        bits of code. The purpose of building the application with components is
        to have a modular architecture, with a clear separation of concerns.
        This makes code easier to understand, easier to maintain, and easier to
        reuse when possible. The state is an object that holds information about
        a certain component. Plain JavaScript functions don't have the ability
        to store information. The code within them executes and 
        once the execution is finished. But thanks to state, React functional
        components can store information even after execution. When we need a
        component to store or "remember" something, or to act in a different way
        depending on the environment, state is what we need to make it work this
        way.
      </p>
      <h1 className='text-xl font-semibold'>
       
        How does prototypical inheritance work?
      </h1>
      <p>
        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
      </p>
      <h1 className='text-xl font-semibold'>
       
        What is a unit test? Why should we write unit tests?
      </h1>
      <p>
        The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
      </p>
      <h1 className='text-xl font-semibold'>
       
        React vs. Angular vs. Vue?

      </h1>
      <p>
        Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
      </p>
    </div>
  )
}

export default Blog
