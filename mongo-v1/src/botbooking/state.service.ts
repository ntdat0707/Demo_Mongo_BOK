import { State } from "./state/class/state.class";
import { StateStart } from "./state/start.state";
import { StateDateBooking } from "./state/date-booking.state";
import { StateQuestionName } from "./state/question-name.state";
import { StateSelectDoctor } from "./state/select-doctor.state";
import { StateNeartestBranch } from "./state/nearest-branch.state";
import { StateQuestionEmail } from "./state/question-email.state";
import { StateSelectService } from "./state/select-service.state";
import { StateSelectLocation } from "./state/select-location.state";
import { StateThankYouBooking } from "./state/thankyou-booking.state";
import { StateQuestionPhoneNumber } from "./state/question-phone-number.state";
import { StateFollowInformation } from "./state/follow-information.state";

export class StateService  {
  public states: State[]
  constructor() {
    this.states = new Array<State>();
    this.initState();
  }

  initState () {
    this.states.push(...[
      new StateStart(),
      new StateDateBooking(),
      new StateQuestionName(),
      new StateSelectDoctor(),
      new StateNeartestBranch(),
      new StateQuestionEmail(),
      new StateSelectService(),
      new StateThankYouBooking(),
      new StateSelectLocation(),
      new StateQuestionPhoneNumber(),
      new StateFollowInformation()
    ]); 
  }

  getState(stateName: string): State {
    console.log(stateName)
    console.log(this.states.find(item => item.name === stateName).name)
    return this.states.find(item => item.name === stateName);
  }
}
