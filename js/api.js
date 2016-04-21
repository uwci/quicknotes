'use strict';

import { ajax } from 'nanoajax';

// TODO: audit for error handling

function buildArgs(args) {
  if (!args) {
    return null;
  }
  let parts = [];
  for (let key in args) {
    const val = args[key];
    const p = encodeURIComponent(key) + '=' + encodeURIComponent(val);
    parts.push(p);
  }
  return parts.join('&');
}

function handleResponse(code, respTxt, cb, cbErr) {
  if (!cb) {
    return;
  }
  let js = {};
  if (code == 200) {
    respTxt = respTxt || '{}';
    js = JSON.parse(respTxt);
  } else {
    respTxt = respTxt || '';
    console.log(`handleResponse: code=${code}, respTxt='${respTxt}'`);
    js['Error'] = `request returned code ${code}, text: '${respTxt}'`;
  }
  const errMsg = js['Error'];
  if (errMsg) {
    if (cbErr) {
      cbErr(js);
    } else {
      alert(errMsg);
    }
  } else {
    cb(js);
  }
}

function get(url, args, cb, cbErr) {
  const urlArgs = buildArgs(args);
  if (urlArgs) {
    url += '?' + urlArgs;
  }
  const params = {
    url: url
  };
  ajax(params, function(code, respTxt) {
    handleResponse(code, respTxt, cb, cbErr);
  });
}

function post(url, args, cb, cbErr) {
  const params = {
    method: 'POST',
    url: url
  };
  const urlArgs = buildArgs(args);
  if (urlArgs) {
    params['body'] = urlArgs;
  }
  ajax(params, function(code, respTxt) {
    handleResponse(code, respTxt, cb, cbErr);
  });
}

export function getNotes(userHandle, cb, cbErr) {
  const args = {
    'user': userHandle
  };
  get('/api/getnotes', args, cb, cbErr);
}

export function getNote(noteId, cb, cbErr) {
  const args = {
    'id': noteId
  };
  get('/api/getnote', args, cb, cbErr);
}

export function undeleteNote(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/undeletenote', args, cb, cbErr);
}

export function deleteNote(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/deletenote', args, cb, cbErr);
}

export function permanentDeleteNote(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/permanentdeletenote', args, cb, cbErr);
}

export function makeNotePrivate(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/makenoteprivate', args, cb, cbErr);
}

export function makeNotePublic(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/makenotepublic', args, cb, cbErr);
}

export function starNote(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/starnote', args, cb, cbErr);
}

export function unstarNote(noteId, cb, cbErr) {
  const args = {
    'noteIdHash': noteId
  };
  post('/api/unstarnote', args, cb, cbErr);
}

export function createOrUpdateNote(noteJSON, cb, cbErr) {
  const args = {
    'noteJSON': noteJSON
  };
  post('/api/createorupdatenote', args, cb, cbErr);
}

export function searchUserNotes(userHandle, searchTerm, cb, cbErr) {
  const args = {
    'user': userHandle,
    'term': searchTerm
  };
  get('/api/searchusernotes', args, cb, cbErr);
}

export function importSimpleNoteStart(email, pwd, cb, cbErr) {
  const args = {
    'email': email,
    'password': pwd
  };
  get('/api/import_simplenote_start', args, cb, cbErr);
}

export function importSimpleNoteStatus(importId, cb, cbErr) {
  const args = {
    'id': importId
  };
  get('/api/import_simplenote_status', args, cb, cbErr);
}
