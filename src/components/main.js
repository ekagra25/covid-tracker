import React from "react";
import axios from "axios";
import Loader from "./loader";
import Home from "./home";
import StateDetails from "./stateDetails";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,

            data: {},
            activeTotal: 0,
            deceasedTotal: 0,
            recoveredTotal: 0
        }
    }

    componentDidMount() {
        axios.get("https://api.covid19india.org/state_district_wise.json", {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.status === 200) {
                delete response.data["State Unassigned"];
                let data = {}, activeTotal = 0, deceasedTotal = 0, recoveredTotal = 0;
                Object.keys(response.data).forEach(key => {
                    let statecode = response.data[key].statecode;
                    data[statecode] = {
                        ...response.data[key],
                        statename: key
                    };
                    let districtData = data[statecode].districtData, activeState = 0, deceasedState = 0, recoveredState = 0;
                    Object.keys(districtData).forEach(innerKey => {
                        activeState += districtData[innerKey].active;
                        deceasedState += districtData[innerKey].deceased;
                        recoveredState += districtData[innerKey].recovered;
                    });
                    data[statecode].activeState = activeState;
                    data[statecode].deceasedState = deceasedState;
                    data[statecode].recoveredState = recoveredState;

                    activeTotal += activeState;
                    deceasedTotal += deceasedState;
                    recoveredTotal += recoveredState;
                });
                this.setState({
                    data: data,
                    activeTotal,
                    deceasedTotal,
                    recoveredTotal,

                    loading: false
                });
            }
        }).catch(error => {
            console.log(error);
            const root = document.getElementById("root");
            const message = document.createElement("h3");
            message.textContent = error.message;
            root.appendChild(message);
            this.setState({
                loading: false
            });
        });
    }

    render() {
        const HomeComponent = () => {
            return(
                <Home
                    data={this.state.data}
                    activeTotal={this.state.activeTotal}
                    deceasedTotal={this.state.deceasedTotal}
                    recoveredTotal={this.state.recoveredTotal}
                    history={this.props.history}
                />
            );
        }
        const StateComponent = ({match}) => {
            console.log(match);
            return(
                <StateDetails
                    data={this.state.data[match.params.statecode]}
                    history={this.props.history}
                />
            )
        }

        if(this.state.loading) {
            return(<Loader />);
        }
        return(
            <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route path="/state/:statecode" component={StateComponent} />
                <Redirect to="/home" />
            </Switch>
        );
    }
}

export default Main;