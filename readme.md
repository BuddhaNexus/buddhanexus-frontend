# Buddhanexus project

This site is under development. Please check the development branch for latest.
This works together with the buddhanexus backend repository.
In the future we plan to move these repositories to a dedicated organisational GitHub.

# Buddhanexus Segment Parallels Tables

This is site for Pali, Sanskrit and Tibetan segment parallels using SIF-weighted averages of word vectors.
More details here:
https://github.com/sebastian-nehrdich/gretil-quotations

This is an ongoing and not finished project. Sutta files have been removed from this repro due to their size but will be uploaded once they are all finished.

After downloading the repro, unzip and run:

> \$ npm install

> \$ npm run dev

This will start the development server and navigate to http://localhost:8080.

The online temporary distribution is to be found on: http://buddhist-db.de/

For upload to a server, run the following command in the src folder:

> \$ npm run prod

And upload the dist folder.

**Dedicated to the public domain via Creative Commons Zero (CC0). You are encouraged to copy, reproduce, adapt, alter, or otherwise make use of this code in any way you wish. Attribution is appreciated but not legally required. You are not allowed to copyright this code in any way.**

## Code style guidelines

1. This project is based on [Open Web Component Recommendations](https://open-wc.org).

2. When in doubt, consult [these code examples](https://stackblitz.com/edit/open-wc-lit-demos). They contain many useful patterns and best practices.

3. JavaScript style is based on [The Airbnb style guide.](https://github.com/airbnb/javascript).

4. There are 2 types of components - **presentational** and **containers**.

- Make sure the only job of **presentational components** is to render received data:

```javascript
export const smallView = ({ param1, param2 }) => html`
  <section>
    <div>${param1}</div>
    <span>${param2}</span>
  </section>
`;
```

- **Container** components can fetch data, do data manipulation, etc.
  They use the `lit-element` lifecycle and typically create a shadow root (by extending `LitElement`):

```javascript
@customElement('large-view')
class LargeView extends LitElement {
  // define properties
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) fetchedAPIData = null;

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    // fetch data, etc
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    // react to changes in properties
  }

  render() {
    // do conditional rendering
    if (this.fetchLoading) {
      return html`
        Loading...
      `;
    }

    return smallView(this.fetchedAPIData);
  }
}
```

As you can see, presentational components are like using just the `render()` method of container components.

5. Other considerations:

- We prefer a declarative style over imperative - use HTML (data-binding) over JavaScript (`querySelector`, etc.).
- Try not to do data manipulation or other costly operations inside `render()`. If it's an one-time operation, it may belong inside `connectedCallback` for example.
