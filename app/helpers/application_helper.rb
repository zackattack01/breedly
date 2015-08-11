module ApplicationHelper
  def csrf_tag
    "<input type='hidden'
            name='authenticity_token'
            value='#{form_authenticity_token}'>".html_safe
  end

  def flash_errors
    if flash[:errors]
      "<ul><li>#{flash[:errors].join('</li><li>')}</li></ul>".html_safe
    end
  end
end
