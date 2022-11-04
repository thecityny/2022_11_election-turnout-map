import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Grid,
  Slider,
} from "@mui/material";
import classnames from "classnames";

import hochulPic from "../assets/images/hochul.jpeg";
import zeldinPic from "../assets/images/zeldin.jpeg";

// TODO: Replace slider positions with actual results:
const DEFAULT_SLIDER_POSITIONS = {
  dem: 57.19857,
  rep: 100,
};

const voterData = {
  2020: {
    demCandidate: {
      name: "Biden",
      votes: 5244886,
    },
    repCandidate: {
      name: "Trump",
      votes: 3251997,
    },
  },
  2018: {
    demCandidate: {
      name: "Cuomo",
      votes: 3635340,
    },
    repCandidate: {
      name: "Molinaro",
      votes: 2207602,
    },
  },
};

function useHasEnteredViewport(ref) {
  const [hasIntersected, setHasIntersected] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => !!entry.isIntersecting && setHasIntersected(true)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return hasIntersected;
}

const calculateTotalVotes = (
  candidateType,
  pastElectionYear,
  sliderPositions,
  opposingSliderPositions
) => {
  const opposingPartyType =
    candidateType === "demCandidate" ? "repCandidate" : "demCandidate";
  const samePartyVotes = voterData[pastElectionYear][candidateType].votes;
  const opposingPartyVotes =
    voterData[pastElectionYear][opposingPartyType].votes;

  return (
    (samePartyVotes * (100 - sliderPositions[1])) / 100 +
    (opposingPartyVotes *
      Math.abs(opposingSliderPositions[0] - opposingSliderPositions[1])) /
      100
  );
};

const PastElectionSelector = ({ pastElection, handleElectionSelection }) => (
  <FormControl>
    <Select
      labelId="past-election-selector"
      id="past-election-selector"
      className="description past-election-selector"
      value={pastElection}
      defaultValue="2020"
      label="Past Election Year"
      onChange={handleElectionSelection}
    >
      <MenuItem value="2020" className="description">
        2020 Presidential Election
      </MenuItem>
      <MenuItem value="2018" className="description">
        2018 Gubernatorial Election
      </MenuItem>
    </Select>
  </FormControl>
);

const ElectionWinnerBanner = ({
  votesForDemocrat,
  votesForRepublican,
  isOnMobile,
  withSmallImage,
}) => (
  <Grid
    item
    className="election-winner"
    xs={12}
    sm={withSmallImage ? 12 : 6}
    alignItems="center"
    justifyContent="center"
    display={
      isOnMobile ? { xs: "flex", sm: "none" } : { xs: "none", sm: "flex" }
    }
  >
    <Box textAlign="center">
      <Box
        className={
          votesForDemocrat >= votesForRepublican ? "color-dem" : "color-rep"
        }
        component="img"
        sx={
          withSmallImage
            ? {
                height: 75,
                width: 75,
              }
            : {
                height: { xs: 75, sm: 150 },
                width: { xs: 75, sm: 150 },
              }
        }
        borderRadius={100}
        alt={
          votesForDemocrat >= votesForRepublican ? "Kathy Hochul" : "Lee Zeldin"
        }
        src={votesForDemocrat >= votesForRepublican ? hochulPic : zeldinPic}
      />
      <h1
        className={
          votesForDemocrat >= votesForRepublican ? "color-dem" : "color-rep"
        }
      >
        {votesForDemocrat >= votesForRepublican ? "Hochul wins" : "Zeldin wins"}
      </h1>

      <p className="description">
        {Math.round(votesForDemocrat).toLocaleString()} votes for Hochul.
      </p>
      <p className="description">
        {Math.round(votesForRepublican).toLocaleString()} votes for Zeldin.
      </p>
    </Box>
  </Grid>
);

export const SingleSlider = ({
  sliderPosition,
  handleChange,
  candidateType,
  pastElectionYear,
}) => (
  <Grid item xs={12} className="description slider-text">
    <div
      className={classnames(
        candidateType === "demCandidate" ? "dem-slider" : "rep-slider"
      )}
    >
      <br />
      <p>
        {`Among past ${voterData[pastElectionYear][candidateType].name} voters, `}{" "}
        <br />
        <span
          className={
            candidateType === "demCandidate" ? "color-dem" : "color-rep"
          }
        >
          {Math.round(sliderPosition * 10) / 10}% voted{" "}
          {candidateType === "demCandidate" ? "Hochul" : "Zeldin"}
        </span>
        {" | "}
        <span>{Math.round((100 - sliderPosition) * 10) / 10}% didn't vote</span>
      </p>
      <Slider
        className="only-show-one-party"
        value={sliderPosition}
        onChange={handleChange}
        valueLabelDisplay="off"
      />
    </div>
  </Grid>
);

export const VoterCalculatorSimple = () => {
  /**
   * This state holds the positions of the two break points on the slider widget
   * for the democratic candidate.
   */
  const [demSliderPosition, setDemSliderPosition] = useState(
    DEFAULT_SLIDER_POSITIONS.dem
  );

  /**
   * This is a duplicate state but for the republican candidate.
   */
  const [repSliderPosition, setRepSliderPosition] = useState(
    DEFAULT_SLIDER_POSITIONS.rep
  );

  const handleDemChange = (event, newValue) => {
    setDemSliderPosition(newValue);
  };

  const handleRepChange = (event, newValue) => {
    setRepSliderPosition(newValue);
  };

  const [pastElectionYear, setPastElectionYear] = React.useState("2020");

  const handleElectionSelection = (event) => {
    setPastElectionYear(event.target.value);
  };

  const appRef = useRef(null);
  const isInViewport = useHasEnteredViewport(appRef);

  const votesForDemocrat = calculateTotalVotes(
    "demCandidate",
    pastElectionYear,
    [100 - demSliderPosition, 100 - demSliderPosition],
    [100 - repSliderPosition, 100 - repSliderPosition]
  );
  const votesForRepublican = calculateTotalVotes(
    "repCandidate",
    pastElectionYear,
    [100 - repSliderPosition, 100 - repSliderPosition],
    [100 - demSliderPosition, 100 - demSliderPosition]
  );
  return (
    <div className="voter-calculator">
      <h1 className="title" ref={appRef}>
        How did voter turnout determine the election?
      </h1>
      <h2 className="description">
        Based on results from the{" "}
        <PastElectionSelector
          pastElectionYear={pastElectionYear}
          handleElectionSelection={handleElectionSelection}
        />
      </h2>
      <Grid container>
        <Grid container item xs={12} sm={6} spacing={2}>
          <SingleSlider
            sliderPosition={isInViewport ? demSliderPosition : 0}
            handleChange={handleDemChange}
            candidateType="demCandidate"
            pastElectionYear={pastElectionYear}
          />

          <SingleSlider
            sliderPosition={isInViewport ? repSliderPosition : 0}
            handleChange={handleRepChange}
            candidateType="repCandidate"
            pastElectionYear={pastElectionYear}
          />
        </Grid>
        <Grid item xs={12} sm={6} container spacing={2}>
          <ElectionWinnerBanner
            votesForDemocrat={votesForDemocrat}
            votesForRepublican={votesForRepublican}
            withSmallImage
          />
          <ElectionWinnerBanner
            votesForDemocrat={votesForDemocrat}
            votesForRepublican={votesForRepublican}
            isOnMobile
            withSmallImage
          />
        </Grid>
      </Grid>
    </div>
  );
};
