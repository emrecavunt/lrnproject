//Ryan Floerance 

/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Suspense, useState } from "react";
import { unstable_scheduleCallback } from "scheduler";
import { unstable_createResource as createResource } from "react-cache";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText
} from "./combobox.jsx";

function App({ tabIndex, navigate }) {
  let [searchTerm, setSearchTerm] = useState(null);
  let [selection, setSelection] = useState(null);
  let [searchTerm2, setSearchTerm2] = useState(null);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Combobox</h1>
      <h2>Async Search</h2>
      <p>
        last selection: <i>{selection}</i>
      </p>
      <form
        onSubmit={event => {
          event.preventDefault();
          setSearchTerm(null);
        }}
      >
        <Combobox onSelect={setSelection}>
          <ComboboxInput
            selectOnClick
            onChange={event => {
              let value = event.target.value;
              unstable_scheduleCallback(() => {
                setSearchTerm(value);
              });
            }}
          />
          <Suspense maxDuration={2000} fallback={<div>Loading...</div>}>
            <AsyncList searchTerm={searchTerm} />
          </Suspense>
        </Combobox>
      </form>

      <div style={{ height: 50 }} />

      <h2>Client side search</h2>
      <Combobox>
        <ComboboxInput onChange={event => setSearchTerm2(event.target.value)} />
        <ComboboxList ariaText={`10 Results for ${searchTerm2}`}>
          {searchTerm2 && searchTerm2.trim() !== ""
            ? Array.from({ length: 10 }).map((_, index) => (
                <ComboboxOption
                  key={index}
                  value={`${searchTerm2} ${rando()}`}
                />
              ))
            : null}
        </ComboboxList>
      </Combobox>

      <div style={{ height: 50 }} />

      <h2>Custom rendering</h2>
      <p>(options intentionally static)</p>
      <Combobox>
        <ComboboxInput />
        <ComboboxList ariaText="10 Results">
          <ComboboxOption value="Apple">
            🍎 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Banana">
            🍌 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Orange">
            🍊 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Pineapple">
            🍍 <ComboboxOptionText />
          </ComboboxOption>
          <ComboboxOption value="Kiwi">
            🥝 <ComboboxOptionText />
          </ComboboxOption>
        </ComboboxList>
      </Combobox>

      <div style={{ height: 400 }} />
    </div>
  );
}

function AsyncList({ searchTerm }) {
  let options = SearchResource.read(searchTerm);

  return options ? (
    <ComboboxList ariaText={`${options.length} results`}>
      {options.map(option => (
        <ComboboxOption key={option} value={option} />
      ))}
    </ComboboxList>
  ) : null;
}

let rando = () =>
  Math.random()
    .toString(16)
    .substr(2, 6);

let SearchResource = createResource(value => {
  return new Promise(resolve => {
    if (!value) {
      resolve(null);
    }
    setTimeout(() => {
      resolve([
        `${value}${rando()}`,
        `${value}${rando()}`,
        `${rando()} ${value} ${rando()}`,
        `${value}${rando()}`,
        `${rando()} ${value} ${rando()}`,
        `${value}${rando()}`,
        `${value}${rando()}`,
        `${value}${rando()}`,
        `${value}${rando()}`,
        `${value}${rando()}`
      ]);
    }, Math.random() * 500);
  });
});

export default () => (
  <Suspense maxDuration={5000} fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);