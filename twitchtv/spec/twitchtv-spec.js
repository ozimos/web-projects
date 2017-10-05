describe ("getUserData", () => {
  it("returns an array", () => {
    let twitchUsers = [
      "ESL_SC2",
      "OgamingSC2",
      "cretetion",
      "freecodecamp",
      "storbeck",
      "habathcx",
      "RobotCaleb",
      "noobs2ninjas"
    ];
    let result = getUserData(twitchUsers);
    expect(result)toBeInstanceOf(Array);
  })
})
