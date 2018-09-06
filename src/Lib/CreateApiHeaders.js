// @flow

type TokenObject = {
  accessToken?: ?string,
  refreshToken?: ?string
}

export default function CreateApiHeaders (tokenObject: TokenObject) {
  if (tokenObject.accessToken) {
    return ({
      'x-api-key': 'FE2YTFMggd3yBG2c3AK9E6tGQ3UmaTeqaip3YpGs',
      'Content-Type': 'application/json',
      Authorization: tokenObject.accessToken
    })
  }
  if (tokenObject.refreshToken) {
    return ({
      'x-api-key': 'FE2YTFMggd3yBG2c3AK9E6tGQ3UmaTeqaip3YpGs',
      'Content-Type': 'application/json',
      refresh_token: tokenObject.refreshToken
    })
  }
  return ({
    'x-api-key': 'FE2YTFMggd3yBG2c3AK9E6tGQ3UmaTeqaip3YpGs'
  })
}
