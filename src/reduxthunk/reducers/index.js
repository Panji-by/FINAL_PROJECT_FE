import {combineReducers} from 'redux';

// import reducers
import auth from './authReducer';
import error from './errorReducer';
import getPaymentConfirmation from './getJsonPayment'
import getProfile from './getProfile'
import patchProfile from './patchProfileReducer';
import postCreateContest from "./postCreateContest";
import getProviderContest from './getProviderContestReducer';
import getParticipantContest from './getParticipantContestReducer';
import postSearchProvider from './postSearchProviderReducer';
import postSearchParticipant from './postSearchParticipantReducer';
import getContestDetail from './getContestDetailReducer';
import getSubmission from './getSubmissionReducer';
import postSubmission from './postSubmissionReducer';
import updateClose from './updateCloseReducer';
import updateWinner from './updateWinnerReducer';
import getWinner from './getWinnerReducer';
import postAdminPayment from './paymentSentReducer';
import postSearchAll from './postSearchAllReducer';
import getAdminDashboard from './getAdminDashboard';
import postPaymentProvider from './postPaymentProviderReducer';
import getAdminDashboardPaid from './getDashboardPaidReducer';
import getAdminDashboardUnpaid from './getDashboardUnpaidReducer';
import getPaymentApprove from './getPaymentApprove';
import getPaymentReject from './getPaymentReject'
import getPaymentStatus from './getPaymentStatusReducer';
import postParticipantAchiev from './postParticipantAchiev';

const rootReducer = combineReducers({
	auth,
	error,
	getPaymentConfirmation,
	getProfile,
	postCreateContest,
	getProviderContest,
	getParticipantContest,
	postSearchProvider,
	postSearchParticipant,
	patchProfile,
	getContestDetail,
	getSubmission,
	postSubmission,
	updateClose,
	updateWinner,
	getWinner,
	postAdminPayment,
	postSearchAll,
	getAdminDashboard,
	postPaymentProvider,
	getAdminDashboardPaid,
	getAdminDashboardUnpaid,
	getPaymentApprove,
	getPaymentReject,
	getPaymentStatus,
	postParticipantAchiev
});

export default rootReducer;