# GitHub Auto-commit

This script is used to automatically made contributions on GitHub and keep up your activity

## Getting Started

These instructions will intruduce you to how script works and how to setup it for free on a virtual server.

## PythonAnywhere Setup Guide

I recommend to use [Python Anywhere](https://www.pythonanywhere.com) to schedule daily task to run this script.

1. [Sign up](https://www.pythonanywhere.com/registration/register/beginner/) for a free beginner plan.

2. Open [dashboard](https://www.pythonanywhere.com/) and create new Bash console by click a button as on a screen:

![Create new Bash Console](https://habrastorage.org/webt/xy/bl/bj/xyblbj0ux6nddbdq3mezollfjze.png)

3. Generate new SSH key console:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Then you will need to press **Enter**:
```
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```

And enter security passphrase (For more information, see [Working with SSH key passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases)):
```
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

4. Add your SSH key to sh-agent
```bash
eval "$(ssh-agent -s)"
```

```bash
ssh-add -k ~/.ssh/id_rsa
```

5. Copy public SSH key
Now you need to open **Files** page on Python Anywhere and move to **.ssh** folder:

![Open .ssh folder](https://habrastorage.org/webt/kw/y2/dl/kwy2dl71xx1k_qrwqnpvtnlx6ee.png)

Open file **id_rsa.pub** and copy the wholw contents of this file

![Open id_rsa.pub](https://habrastorage.org/webt/bl/pm/sw/blpmswq9e2iufeo0oxmgfixqrvu.png)

6. Add SSH key to your GitHUb account
Go to [Github add SSH page](https://github.com/settings/ssh/new), enter title "PythonAnywhere" and **paste** your **key** to the *key* textarea, click **Save SHH key**.

## Authors

* **Viktor Kirillov** - *Initial work* - [@kirillovmr](https://github.com/kirillovmr)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details