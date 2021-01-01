---
title: Typo_Layout
---

Typography and Layout
=====================

This layout is adopted from Tufts CSS by Dave Liepmann.

Using Template
--------------

Style sheets with fonts and layout are embedded in the in the `template.html` file.
Template file draws from the `.css` files in the `stylesheets` folder.

* **blog_style.css** controls the header and page dimensions 
* **tufte.css** control the article typesetting and layout

Content for the blog is written in markdown and then populated into a html using pandoc. 

    ;; shell script 
    pandoc -f markdown -t html <.md> --template=<.html> -o <.html>

[A vim function to automate it might be simpler]{.sidenote}

Outline of Elements 
-------------------

# Heading 1
## Heading 2
### Heading 3


Example of quoted text:

> \[It is\] notable that the Feynman lectures (3 volumes) write about
> all of physics in 1800 pages, using only 2 levels of hierarchical
> headings: chapters and A-level heads in the text. It also uses the
> methodology of *sentences* which then cumulate sequentially into
> *paragraphs*, rather than the grunts of bullet points. Undergraduate
> Caltech physics is very complicated material, but it didn't require an
> elaborate hierarchy to organize.
>
> [Edward Tufte, forum post, 'Book design: advice and examples'
> thread](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB)

Links aren't highlighted in color. ⊕[Blue text, while also a widely
recognizable clickable-text indicator, is crass and distracting.
Luckily, it is also rendered unnecessary by the use of
underlining.]{.marginnote}

Epigraphs
---------

::: {.epigraph}
> The English language . . . becomes ugly and inaccurate because our
> thoughts are foolish, but the slovenliness of our language makes it
> easier for us to have foolish thoughts.
>
> George Orwell, "Politics and the English Language"

> For a successful technology, reality must take precedence over public
> relations, for Nature cannot be fooled.
>
> Richard P. Feynman, "What Do You Care What Other People Think?"

> I do not paint things, I paint only the differences between things.
>
> Henri Matisse, Henri Matisse Dessins: thèmes et variations (Paris,
> 1943), 37
:::


Sidenotes: Footnotes and Marginal Notes {#sidenotes}
---------------------------------------

One of the most distinctive features of Tufte's style is his extensive
use of sidenotes.[This is a sidenote.]{.sidenote} Sidenotes are like
footnotes, except they don't force the reader to jump their eye to the
bottom of the page, but instead display off to the side in the margin.
Perhaps you have noticed their use in this document already. You are
very astute.

Sidenotes are a great example of the web not being like print. On
sufficiently large viewports, Tufte CSS uses the margin for sidenotes,
margin notes, and small figures. On smaller viewports, elements that
would go in the margin are hidden until the user toggles them into view.
The goal is to present related but not necessary information such as
asides or citations *as close as possible* to the text that references
them. At the same time, this secondary information should stay out of
the way of the eye, not interfering with the progression of ideas in the
main text.

Sidenotes consist of two elements: a superscript reference number that
goes inline with the text, and a sidenote with content. To add the
former, just put a label and dummy checkbox into the text where you want
the reference to go, like so:

    <label for="sn-demo"
           class="margin-toggle sidenote-number">
    </label>
    <input type="checkbox"
           id="sn-demo"
           class="margin-toggle"/>

You must manually assign a reference `id` to each side or margin note,
replacing "sn-demo" in the `for` and the `id` attribute values with an
appropriate descriptor. It is useful to use prefixes like `sn-` for
sidenotes and `mn-` for margin notes.

Immediately adjacent to that sidenote reference in the main text goes
the sidenote content itself, in a `span` with class `sidenote`. This tag
is also inserted directly in the middle of the body text, but is either
pushed into the margin or hidden by default. Make sure to position your
sidenotes correctly by keeping the sidenote-number label close to the
sidenote itself.

If you want a sidenote without footnote-style numberings, then you want
a margin note. ⊕ [ This is a margin note. Notice there isn't a number
preceding the note. ]{.marginnote} On large screens, a margin note is
just a sidenote that omits the reference number. This lessens the
distracting effect taking away from the flow of the main text, but can
increase the cognitive load of matching a margin note to its referent
text. However, on small screens, a margin note is like a sidenote except
its viewability-toggle is a symbol rather than a reference number. This
document currently uses the symbol ⊕ (`&#8853;`), but it's up to you.

Margin notes are created just like sidenotes, but with the `marginnote`
class for the content and the `margin-toggle` class for the label and
dummy checkbox. For instance, here is the code for the margin note used
in the previous paragraph:

    <label for="mn-demo" class="margin-toggle">&#8853;</label>
    <input type="checkbox" id="mn-demo" class="margin-toggle"/>
    <span class="marginnote">
      This is a margin note. Notice there isn’t a number preceding the note.
    </span>

Figures in the margin are created as margin notes, as demonstrated in
the next section.
:::

::: {.section}
Figures
-------

Tufte emphasizes tight integration of graphics with text. Data, graphs,
and figures are kept with the text that discusses them. In print, this
means they are not relegated to a separate page. On the web, that means
readability of graphics and their accompanying text without extra
clicks, tab-switching, or scrolling.

Figures should try to use the `figure` element, which by default are
constrained to the main column. Don't wrap figures in a paragraph tag.
Any label or margin note goes in a regular margin note inside the
figure. For example, most of the time one should introduce a figure
directly into the main flow of discussion, like so:

![](img/exports-imports.png)

⊕[![Image of a Rhinoceros](img/rhino.png)F.J. Cole, "The History of
Albrecht Dürer's Rhinoceros in Zooological Literature," *Science,
Medicine, and History: Essays on the Evolution of Scientific Thought and
Medical Practice* (London, 1953), ed. E. Ashworth Underwood, 337-356.
From page 71 of Edward Tufte's *Visual Explanations*.]{.marginnote} But
tight integration of graphics with text is central to Tufte's work even
when those graphics are ancillary to the main body of a text. In many of
those cases, a margin figure may be most appropriate. To place figures
in the margin, just wrap an image (or whatever) in a margin note inside
a `p` tag, as seen to the right of this paragraph.

If you need a full-width figure, give it the `fullwidth` class. Make
sure that's inside an `article`, and it will take up (almost) the full
width of the screen. This approach is demonstrated below using Edward
Tufte's English translation of the Napoleon's March data visualization.
From *Beautiful Evidence*, page 122-124.

![](img/napoleons-march.png)

One obstacle to creating elegant figures on the web is the difficulty of
handling different screen sizes, especially on the fly. Embedded
`iframe` elements are particularly troublesome. For these instances we
provide a helper class, `iframe-wrapper`, the most common use for which
is probably YouTube videos, e.g.

    <figure class="iframe-wrapper">
      <iframe width="853" height="480" src="https://www.youtube.com/embed/YslQ2625TR4" frameborder="0" allowfullscreen></iframe>
    </figure>

You can use this class on a `div` instead of a `figure`, with slightly
different results but the same general effect. Experiment and choose
depending on your application.
:::

::: {.section}
Code
----

Technical jargon, programming language terms, and code samples are
denoted with the `code` class, as I've been using in this document to
denote HTML. Code needs to be monospace for formatting purposes and to
aid in code analysis, but it must maintain its readability. To those
ends, Tufte CSS follows GitHub's font selection, which shifts gracefully
along the monospace spectrum from the elegant but rare Consolas all the
way to good old reliable Courier.

Extended code examples should live in a `code` element within a `pre`
element. This adds control over indentation and overflow as well:

    ;; Some code examples in Clojure. This is a comment.

    ;; applying a function to every item in the collection
    (map tufte-css blog-posts)
    ;;;; if unfamiliar, see http://www.lispcast.com/annotated-map

    ;; side-effecty loop (unformatted, causing text overflow) - from https://clojuredocs.org/clojure.core/doseq
    (doseq [[[a b] [c d]] (map list (sorted-map :1 1 :2 2) (sorted-map :3 3 :4 4))] (prn (* b d)))

    ;; that same side-effecty loop, formatted
    (doseq [[[a b] [c d]] (map list
                               (sorted-map :1 1 :2 2)
                               (sorted-map :3 3 :4 4))]
      (prn (* b d)))

    ;; If this proselytizing has worked, check out:
    ;; http://howistart.org/posts/clojure/1
:::

::: {.section}
ImageQuilts
-----------

Tufte CSS provides support for Edward Tufte and Adam Schwartz's
[ImageQuilts](http://imagequilts.com/). See the [ET forum announcement
thread](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003wk)
for more on quilts. Some have ragged edges, others straight. Include
these images just as you would any other `figure`.

This is an ImageQuilt surveying Chinese calligraphy, placed in a
full-width figure to accomodate its girth:

![](img/imagequilt-chinese-calligraphy.png)

Here is an ImageQuilt of 47 animal sounds over and over, in a figure
constrained to the main text region. This quilt has ragged edges, but
the image itself is of course still rectangular.

![](img/imagequilt-animal-sounds.png)
:::

::: {.section}
Epilogue
--------

Many thanks go to Edward Tufte for leading the way with his work. It is
only through his kind and careful editing that this project accomplishes
what it does. All errors of implementation are of course mine.
:::
