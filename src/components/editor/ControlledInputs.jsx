import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Universal Controlled Input with debouncing for stable typing
export function ControlledInput({ value, onChange, onBlur, ...props }) {
  const [localValue, setLocalValue] = useState(value || "");
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 100);
  };

  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onChange(localValue);
    if (onBlur) onBlur();
  };

  return (
    <Input
      {...props}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

// Universal Controlled Textarea with debouncing
export function ControlledTextarea({ value, onChange, onBlur, ...props }) {
  const [localValue, setLocalValue] = useState(value || "");
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 100);
  };

  const handleBlur = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onChange(localValue);
    if (onBlur) onBlur();
  };

  return (
    <Textarea
      {...props}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}