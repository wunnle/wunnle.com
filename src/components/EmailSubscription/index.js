import addToMailchimp from 'gatsby-plugin-mailchimp'
import React from 'react'
import { useState } from 'react'

import styles from './EmailSubscription.module.css'

const MailIcon = () => (
  <svg
    width="100"
    height="96"
    viewBox="0 0 100 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.mailIcon}
  >
    <path
      d="M99.7802 85.8905V32.2641L47.2527 2.37402L0 32.2641V85.8905H99.7802Z"
      fill="#0F8BC9"
    />
    <path
      d="M14.0654 2.78461C14.0654 1.24671 15.3121 0 16.85 0H83.3687C84.9066 0 86.1533 1.24672 86.1533 2.78462V79.8088C86.1533 81.3467 84.9066 82.5934 83.3687 82.5934H16.85C15.3121 82.5934 14.0654 81.3467 14.0654 79.8088V2.78461Z"
      fill="#F4F4F4"
    />
    <path
      d="M50 66.1103L0 32.2642V91.5828C0 93.7798 1.78102 95.5609 3.97802 95.5609H96.022C98.219 95.5609 100 93.7798 100 91.5828V32.2642L50 66.1103Z"
      fill="#15A6EF"
    />
    <g opacity="0.86">
      <path d="M50 32.3061L56.867 32.0485L50 22.3447V32.3061Z" fill="#0D79BE" />
      <path
        d="M50.0008 32.3061L43.1338 32.0485L50.0008 22.3447V32.3061Z"
        fill="#3790BB"
      />
      <path d="M64.5924 40.0336L70.0002 22L50 32.3049L64.5924 40.0336Z" fill="#D06A29" />
      <path d="M50.0002 32.3049L30 22L35.4078 40.0336L50.0002 32.3049Z" fill="#F69226" />
      <path
        d="M50.0006 32.3052L64.5931 40.0339H35.4082L50.0006 32.3052Z"
        fill="#ED7723"
      />
    </g>
  </svg>
)

const EmailSubscription = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [step, setStep] = useState('signUp')

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await addToMailchimp(email, { FNAME: name })
    console.log({ result })

    if (result.msg.includes('We need to confirm your email address')) {
      setStep('confirmEmail')
    }

    if (result.msg.includes('already subscribed')) {
      setStep('alreadySubscribed')
    }
  }

  if (step === 'confirmEmail') {
    return (
      <div className={styles.subscribeForm}>
        <div className={styles.formInner}>
          <div className={styles.confirmInfo}>
            <MailIcon />
            <div className={styles.infoTitles}>
              <h3 className={styles.smallerTitle}>Thanks for subscribing!</h3>
              <p className={styles.preTitle}>
                Please check your inbox and confirm your subscription.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'alreadySubscribed') {
    return (
      <div className={styles.subscribeForm}>
        <div className={styles.formInner}>
          <div className={styles.confirmInfo}>
            <MailIcon />
            <div className={styles.infoTitles}>
              <h3 className={styles.smallerTitle}>
                You're already subscribed{' '}
                <span role="img" aria-label="grin">
                  😬
                </span>
              </h3>
              <p className={styles.preTitle}>
                You'll receive emails when there is new content.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'signUp') {
    return (
      <form onSubmit={handleSubmit} className={styles.subscribeForm}>
        <div className={styles.formInner}>
          <div className={styles.info}>
            <MailIcon />
            <div className={styles.infoTitles}>
              <p className={styles.preTitle}>Enjoyed this article?</p>
              <h3 className={styles.title}>
                Get new ones <br /> in your inbox!
              </h3>
            </div>
          </div>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            value={name}
            placeholder="First name"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">First name</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button>Subscribe</button>
          <p className={styles.fineCopy}>No spam. Unsubscribe whenever.</p>
        </div>
      </form>
    )
  }
}

export default EmailSubscription
