import PropTypes from 'prop-types';
import Directions from '../directions.js'
import CallTypes from '../callTypes.js'

const CallRecord = {
    direction: PropTypes.oneOf(Object.keys(Directions)).isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    via: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    is_archived: PropTypes.bool.isRequired,
    call_type: PropTypes.oneOf(Object.keys(CallTypes)).isRequired,
    id: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
}

export default CallRecord;