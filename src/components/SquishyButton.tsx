"use client";

import React from "react";
import Link from "next/link";

export type SquishyVariant = "default" | "mono" | "sand" | "centre";

const variantClass: Record<SquishyVariant, string> = {
  default: "",
  mono: "svu-squish-btn--mono",
  sand: "svu-squish-btn--sand",
  centre: "svu-squish-btn--centre",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: SquishyVariant;
  className?: string;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type LinkProps = CommonProps & {
  href: string;
  onClick?: () => void;
};

/**
 * "Squishy" glass button — Uiverse.io design by FColombati, retinted per
 * section palette via the `variant` prop. Styles live in globals.css under
 * the `.svu-squish-*` classes. Renders a <Link> when `href` is given,
 * otherwise a <button>.
 */
export default function SquishyButton(props: ButtonProps | LinkProps) {
  const { children, variant = "default", className = "" } = props;
  const classes = `svu-squish-btn ${variantClass[variant]} ${className}`.trim();

  const inner = (
    <span className="svu-squish-outer">
      <span className="svu-squish-inner">
        <span>{children}</span>
      </span>
    </span>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {inner}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
