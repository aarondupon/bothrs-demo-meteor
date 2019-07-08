import React, { useContext } from "react";
let initialState = { isClient: false };
export const RenderContext = React.createContext({});
export const useRenderContext = () => useContext(RenderContext);
export const RenderContextProvider = ({ value, children }) => 
    <RenderContext.Provider value={Object.assign(initialState,value)}>
      {children}
    </RenderContext.Provider>
