import i18n from 'i18next';import k from '~/i18n/keys';import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Index} />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path={`${match.url}/introduction`} component={Introduction} />
        <Redirect from={`${match.url}/*`} to="/" />
      </div>
    </Router>);

}

function Header() {
  return (
    <div>
      <CustomComponent customAttr={`${i18n.t(k.P)} ${potato}`} />
      <Link to="/">{i18n.t(k.HOME)}</Link>
    </div>);

}

export default App;
