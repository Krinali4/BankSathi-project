import React from 'react'
import InfoModal from '../client/Common/Modal/InfoModal'

export default function page() {
  return (
    <div> <InfoModal
    data={{
      title1:
         "Sorry Your Application Got Rejected",
      title2:  "Your credit card application is in process",
        
      imageSrc
        : "/assets/rejection-badge.svg",
      applicationRefNo
        : "24A25D27654030W1",
      height: 73,
      width: 73,
      date:  "12-02-2024",
      buttonTitle: "Thank You",
    }}
  /></div>
  )
}
