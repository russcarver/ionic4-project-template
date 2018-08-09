import { Component } from '@angular/core';
import { MetadataOverride } from '@angular/core/testing';

export class TestBedComponentOverride {
  public token: any;
  public override: MetadataOverride<Component>;
}
