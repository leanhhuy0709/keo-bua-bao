import "./ErrorPage.css";

import React from 'react';
import {Button} from 'react-bootstrap'

export default function ErrorPage() {
    return (
      <div className="text-center mt-5">
      <img
        src="https://www.seekpng.com/png/detail/222-2227336_page-subnautica-wiki-fandom-404-not-found-png.png"
        alt="not-found"
      />
      <br/>
      <Button href = "/" className="mt-4">Go home</Button>
    </div>
    )
}


