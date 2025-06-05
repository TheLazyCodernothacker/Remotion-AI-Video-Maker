import React from 'react';

export const Intermediate_Value_Theorem: React.FC = () => {
  return (
    <div>
      <h1>Intermediate_Value_Theorem</h1>
      <p>This section is dedicated to the Intermediate Value Theorem (IVT). The theorem's conditions and conclusion are stated clearly: "If a function f is continuous on a closed interval [a, b], and k is any number between f(a) and f(b), then there exists at least one number c in the interval (a, b) such that f(c) = k." A dynamic graph demonstrates the theorem by showing a continuous curve passing through an intermediate y-value 'k' between f(a) and f(b), highlighting the guaranteed existence of 'c'. Simple examples illustrate scenarios where the IVT applies and where its conditions are not met.</p>
    </div>
  );
};

export const Intermediate_Value_Theorem_Duration = 1000;
export const Intermediate_Value_Theorem_Edited = false;