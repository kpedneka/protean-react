import * as firebase from 'firebase';

function verifyData(title, description, amount, tags) {
  amount = Number.parseFloat(amount);
  var invalid = false;
  var msg = "";
  console.log('hi from verifyData')
  // check title: string, not empty
  if (!(typeof title === 'string')) {
    invalid = true;
    msg += "title must be a string.\n"
    console.log('error');
  }
  if (title === '') {
    invalid = true;
    msg += "title must be non-empty string.\n"
    console.log('error');
  }
  // check description: string
  if (!(typeof description === 'string')) {
    invalid = true;
    msg += "description must be a string.\n"
    console.log('error');
  }
  // check amount: int/float, not empty
  if (!(typeof amount === 'number')) {
    invalid = true;
    msg += "amount must be a number or float.\n"
    console.log('error');
  }
  // check tags: object

  return {valid: invalid, msg: msg}
}

// add prop-types for verify function

export function writeBill(title, description, amount, tags) {
  console.log('hello reached writeBill action');
  // perform checks to ensure data types
  var verify = verifyData(title, description, amount, tags);
  if (verify.valid) {
    return dispatch => {
      dispatch({
        type: 'WRITE_BILL_FAILED',
        payload: verify.msg
      });
    }
  }
  // dispatch some action that removes the stored token
  var user = firebase.auth().currentUser;
  if (user) {
    var newPostKey = firebase.database().ref().child('bills').push().key;
    console.log(user.uid, newPostKey);
    var postData = { 
            owner: user.displayName, uid: user.uid,
            title: title, description: description,
            amount: Number.parseFloat(amount), tags: tags,
            dateCreated: new Date(), dateResolved: null,
            resolved: false
    };
    var updates = {};
    updates['/bills/' + newPostKey] = postData;
    // updates['/users/' + user.uid + '/posts/'+newPostKey] = newPostKey;
    firebase.database().ref().update(updates);
    return dispatch => {
      dispatch({
        type: 'ADD_BILL',
        payload: null
      });
    };
  } else {
    console.log('cannot add bill because user is not logged in');
  }
}

export function getBills() {
	console.log('woohoo inside the action for getBills');
  // var user = firebase.auth().currentUser;
  var ref = firebase.database().ref("bills");
  var temp = null;
  ref.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(snapChild){
      var newArray = temp ? temp.slice() : [];
      newArray.push(snapChild); 
      temp = newArray;
    })
  });
  return dispatch => {
    dispatch({
      type: 'GET_BILLS',
      payload: temp
    })
  }
}