import React, { Component } from "react";
import "./CurrentCoffePage.sass";
import Header from "../../components/header/header";
import CurrentCoffee from "../../components/current-coffee/CurrentCoffee";
import Footer from "../../components/footer/footer";
import WithService from "../../hoc/hoc";
import {
  setCurrentCoffee,
  dataLoaded,
  dataRequsted,
  dataError
} from "../../actions/actions";
import { connect } from "react-redux";

class CurrentCoffeePage extends Component {
  constructor(props) {
    super(props);
    this.props.dataRequsted();
    const { Service } = this.props;
    Service.getItems("coffee")
      .then(res => this.props.dataLoaded(res))
      .catch(() => this.props.dataError());
  }
  componentDidMount() {
    this.props.setCurrentCoffee(this.props.id);
  }

  render() {
    const { coffee } = this.props;
    const [data] = coffee;
    return (
      <div>
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <Header />
              </div>
            </div>
            <h1 className="title-big">Our Coffee</h1>
          </div>
        </div>
        <CurrentCoffee data={data} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coffee: state.currentCoffee,
    mas: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentCoffee: currentCoffee => {
      dispatch(setCurrentCoffee(currentCoffee));
    },
    dataLoaded: newData => {
      dispatch(dataLoaded(newData));
    },
    dataRequsted: () => dispatch(dataRequsted()),
    dataError: () => dispatch(dataError())
  };
};

export default WithService()(
  connect(mapStateToProps, mapDispatchToProps)(CurrentCoffeePage)
);
