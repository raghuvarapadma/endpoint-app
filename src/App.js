import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

// import your custom data fetching function
// TODO: add a data fetching function to the api.js file in the endpoints folder
// import { getAllAvatarCharacters } from "./data/endpoints";
import { getAllNBATeams, getPlayer } from "./data/endpoints";

const App = () => {
  // const [characters, setCharacters] = useState(null);
  const [teams, setTeams] = useState(null);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  /**
   * TODO: modify this useEffect to pass as many params as you want
   * - at minimum, pass your state setting function from above
   * - you could also create more state variables to handle multiple params for your endpoint / user input
   */
  // useEffect(() => {
  //   if (!characters) {
  //     // if our characters is null, fetch some data!
  //     getAllAvatarCharacters(setCharacters);
  //   }
  //   // don't forget to add every state variable you're monitoring to this array!
  // }, [characters]);

  useEffect(() => {
    if (!teams) {
      // if our characters is null, fetch some data!
      getAllNBATeams(setTeams);
    }
    // don't forget to add every state variable you're monitoring to this array!
  }, [teams]);

  const getImage = (e) => {
    e.preventDefault();
    console.log("EEEEEE")
    getPlayer(setImageURL, name)
  }

  const changeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  // return (
  //   <div className="home">
  //     <div id="content">
  //       <ReactMarkdown className="background" source={app_background} />

  //       <div className="container">
  //         {/**
  //          * Code explanation:
  //          * Feel free to delete this or modify this. It is creating a grid using Boostrap classes
  //          * - map has a 2nd parameter that tells you the elements index in the array, its good practice to pass this as the key prop
  //          * - remember to print to console the data you fetch, it will definitely have different properties & values than my data!
  //          */}
  //         <div className="row justify-content-md-center">
  //           {/**
  //            * - TODO: use a ternary to add conditional react elements
  //            * - in this case, if characters is null, it displays "No characters"
  //            * - otherwise, it maps through characters and renders info for each person!
  //            */}
  //           {characters ? (
  //             characters.map((char, idx) => (
  //               <div className="col-3 character" key={idx}>
  //                 {/* Displays name of each character */}
  //                 <h2 className="name">{char.name}</h2>
  //                 {/* Displays image of each character + adds an additional class (character-img) so I can customize in my CSS file*/}
  //                 <img
  //                   src={char.photoUrl}
  //                   className="img-fluid character-img"
  //                   alt="character icon"
  //                 ></img>
  //                 <div className="character-description">
  //                   {/* Displays list of each character's allies (stored in an array within the char object called allies) */}
  //                   <h4>Allies</h4>
  //                   {char.allies.map(
  //                     (a, idx) => a.length > 1 && <li key={idx}>{a}</li>
  //                   )}
  //                 </div>
  //               </div>
  //             ))
  //           ) : (
  //             <div>No Characters</div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />

        <div className="row justify-content-md-center">
          <Form>
            <Form.Group controlId="form-input justify-content-center">
              {/**
               * TODO: pass 2 props to the FormControl element
               * 1. placeholder (string) -> pass a string explaining what the input is for (ex: "Enter a task!")
               * 2. onChange (function) -> pass one of the functions above that handles the user's input
               */}
              <FormControl placeholder={"Type a Player's Name" } onChange={changeName} />
              <InputGroup.Append className="justify-content-center p-2">
                {/** TODO: Add a prop & add some text to the button
                 * 1. onClick (function) -> pass one of the functions above that handles a task being added
                 * 2. Add text between the open and closing button tags, describing what the button should say
                 */}
                <Button onClick={getImage} type={"submit"} variant='danger' >Enter in a player name!</Button>
              </InputGroup.Append>
            </Form.Group>
          </Form>
        </div>
        
        <div className="row justify-content-md-center">
          {imageURL !== "" ? (
            <img src={imageURL}></img>
          ): (
            <div>No image</div>
          )}
        </div>

        <div className="container">
          {/**
           * Code explanation:
           * Feel free to delete this or modify this. It is creating a grid using Boostrap classes
           * - map has a 2nd parameter that tells you the elements index in the array, its good practice to pass this as the key prop
           * - remember to print to console the data you fetch, it will definitely have different properties & values than my data!
           */}
          <div className="row justify-content-md-center">
            {/**
             * - TODO: use a ternary to add conditional react elements
             * - in this case, if characters is null, it displays "No characters"
             * - otherwise, it maps through characters and renders info for each person!
             */}
             
            {teams ? (
              teams.data.map((team, idx) => (
                <div className="col-4 character" key={idx}>
                  <h2 className="name">{team.full_name} ({team.abbreviation})</h2>
                  <div className="text-center">
                    Conference: {team.conference}
                    <br />
                    Division: {team.division}
                  </div>
                </div>
              ))
            ) : (
              <div>No Teams</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
